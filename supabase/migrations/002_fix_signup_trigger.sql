-- Improvements to the handle_new_user function to prevent 500 errors
-- 1. Explicitly sets search_path to public to prevent issues with extension lookup
-- 2. Adds better error handling/defaults for metadata

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    NEW.raw_user_meta_data->>'phone',
    COALESCE(
      (NEW.raw_user_meta_data->>'role')::user_role,
      'farmer'::user_role
    )
  );
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error details if accessible, or just return NEW to allow auth to succeed 
    -- (though profile creation will fail, at least auth won't 500)
    -- Ideally we want it to fail if profile creation fails, but properly caught.
    -- For now, re-raising is fine as long as the inputs are handled correctly above.
    RAISE;
END;
$$ LANGUAGE plpgsql;

-- Ensure the trigger is still correctly attached (idempotent)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
