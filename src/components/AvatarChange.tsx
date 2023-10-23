import { ActivityIndicator } from "@/components/ui/ActivityIndicator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { BACKEND_URL } from "@/lib/constants";
import { ImagePlusIcon } from "lucide-react";
import { changeAvatar as changeUserAvatar } from "@/lib/auth/actions";
import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function AvatarChange({
  avatar_id,
}: {
  avatar_id: string | null;
}) {
  const [selectedFile, setSelectedFile] = useState<Blob | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const filepickerRef = useRef<HTMLInputElement | null>(null);

  const changeAvatar = () => {
    if (!selectedFile) return;

    setIsUploading(true);
    changeUserAvatar(selectedFile).then((data) => {
      setIsUploading(false);
      setIsDialogOpen(false);
      console.log(data);
    });
  };

  const openFilePicker = () => {
    if (!filepickerRef.current) return;
    filepickerRef.current.click();
  };

  const onFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target || !e.target.files) return;

    setSelectedFile(e.target.files[0]);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log(e.dataTransfer.files[0]);
    setSelectedFile(e.dataTransfer.files[0]);
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger>
          <Avatar className="mr-4">
            {avatar_id && !isUploading ? (
              <AvatarImage src={`${BACKEND_URL}/avatar`} />
            ) : null}
            <AvatarFallback>
              <ImagePlusIcon className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change avatar</DialogTitle>
          </DialogHeader>
          <div className="py-4 cursor-pointer">
            <div
              onDragStart={(e) => (e.dataTransfer.dropEffect = "copy")}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={openFilePicker}
              className="h-40 w-full flex items-center justify-center flex-col border-2 border-border border-dashed rounded-lg relative"
            >
              <ImagePlusIcon className="h-6 w-6 mb-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground font-semibold max-w-[50%] text-center balanced">
                Drag and drop your image here or click to open file picker.
              </p>
              <p className="absolute bottom-5 text-sm text-muted-foreground">
                {selectedFile ? selectedFile.name : null}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={changeAvatar}
              disabled={isUploading || !selectedFile}
            >
              {isUploading ? (
                <ActivityIndicator className="h-4 w-4 mr-2" />
              ) : null}
              Change
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {createPortal(
        <input
          onChange={onFileSelect}
          className="hidden"
          type="file"
          accept="image/png, image/jpeg"
          ref={filepickerRef}
        />,
        document.body
      )}
    </>
  );
}
