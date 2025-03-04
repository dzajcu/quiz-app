import { Upload } from "lucide-react";

interface InputFileProps {
    onFileSelect: (file: File) => void;
}

const InputFile = ({ onFileSelect }: InputFileProps) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    };

    return (
        <div className="flex items-center justify-center w-full h-full">
            <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-full p-6 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-background/50 hover:bg-primary/5 hover:border-primary transition-all duration-300 ease-in-out transform hover:scale-[1.01] hover:shadow-lg group hover:shadow-primary/20"
            >
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="p-4 rounded-full bg-primary/10 transition-transform duration-300">
                        <Upload className="w-8 h-8 text-primary transition-all duration-300 group-hover:animate-bounce"/>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-2">
                        <p className="text-lg font-semibold text-primary">
                            Upload Questions File
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Drop your JSON file here or click to browse
                        </p>
                    </div>
                </div>
                <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept=".json"
                    onChange={handleFileChange}
                />
            </label>
        </div>
    );
};

export default InputFile;
