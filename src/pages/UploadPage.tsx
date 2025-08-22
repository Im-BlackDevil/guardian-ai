import { Upload } from "lucide-react";

const UploadPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center">
      <Upload className="h-12 w-12 text-primary mb-6" />
      <h1 className="text-3xl font-bold mb-4">Upload Your Document</h1>
      <p className="text-muted-foreground mb-6">
        Choose a file to analyze for hidden biases and patterns.
      </p>
      <input type="file" className="mb-4" />
      <button className="px-6 py-3 bg-primary text-white rounded-lg">
        Analyze
      </button>
    </div>
  );
};

export default UploadPage;
