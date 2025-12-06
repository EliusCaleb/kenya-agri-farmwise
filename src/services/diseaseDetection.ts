/**
 * Google Cloud Disease Detection Service
 * Handles image upload and disease prediction using Vertex AI
 */

interface DiseaseResult {
	disease: string;
	confidence: number;
	severity: string;
	symptoms: string[];
	treatment: string[];
	prevention: string[];
	image_url?: string;
}

class DiseaseDetectionService {
	private apiUrl: string;

	constructor() {
		this.apiUrl = import.meta.env.VITE_DISEASE_PREDICTION_API || '';

		if (!this.apiUrl) {
			console.warn('Disease prediction API URL not configured');
		}
	}

	/**
	 * Convert image file to base64 string
	 */
	private async fileToBase64(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				const base64 = reader.result as string;
				// Remove data:image/...;base64, prefix
				const base64Data = base64.split(',')[1];
				resolve(base64Data);
			};
			reader.onerror = error => reject(error);
		});
	}

	/**
	 * Predict disease from image file
	 */
	async predictDisease(imageFile: File): Promise<DiseaseResult> {
		try {
			// Convert image to base64
			const base64Image = await this.fileToBase64(imageFile);

			// Call prediction API
			const response = await fetch(this.apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					image: base64Image,
					filename: imageFile.name,
				}),
			});

			if (!response.ok) {
				throw new Error(`API request failed: ${response.statusText}`);
			}

			const result: DiseaseResult = await response.json();
			return result;

		} catch (error) {
			console.error('Disease prediction error:', error);
			throw new Error('Failed to analyze crop image. Please try again.');
		}
	}

	/**
	 * Check if API is configured
	 */
	isConfigured(): boolean {
		return !!this.apiUrl;
	}
}

// Export singleton instance
export const diseaseDetectionService = new DiseaseDetectionService();

// Export types
export type { DiseaseResult };
