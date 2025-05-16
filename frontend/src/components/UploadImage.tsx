// src/components/UploadImage.tsx
import React, { useRef, useState } from 'react';
import * as tmImage from '@teachablemachine/image';
import { toast } from 'react-hot-toast';

type AnalysisType = 'hair' | 'skin';

interface Props {
  type: AnalysisType;
  onResult: (result: string) => void;
}

const MODEL_URLS: Record<AnalysisType, string> = {
  hair: 'https://teachablemachine.withgoogle.com/models/o1R68h23F/',
  skin: 'https://teachablemachine.withgoogle.com/models/27XV_wcuj/',
};

const UploadImage: React.FC<Props> = ({ type, onResult }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const imageSrc = reader.result as string;
      setPreview(imageSrc);
      setLoading(true);

      try {
        const model = await tmImage.load(
          MODEL_URLS[type] + 'model.json',
          MODEL_URLS[type] + 'metadata.json'
        );
        const img = new Image();
        img.src = imageSrc;
        img.onload = async () => {
          const predictions = await model.predict(img);
          const best = predictions.reduce((max, curr) =>
            curr.probability > max.probability ? curr : max
          );
          onResult(`${type.toUpperCase()} Result: ${best.className} (${(best.probability * 100).toFixed(2)}%)`);
          setLoading(false);
        };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        toast.error('Analysis failed. Please try again.');
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={handleUpload}
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="bg-blue-600 text-white px-5 py-2 rounded-full shadow hover:bg-blue-700 transition-all"
      >
        Upload {type} Image
      </button>

      {loading && <p className="text-gray-500">Analyzing...</p>}
      {preview && (
        <img
          src={preview}
          alt="Uploaded"
          className="w-48 h-48 object-cover rounded-xl shadow-lg mt-2"
        />
      )}
    </div>
  );
};

export default UploadImage;
