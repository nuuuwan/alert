import { useRef, forwardRef, useImperativeHandle } from "react";
import Box from "@mui/material/Box";
import html2canvas from "html2canvas";

const DownloadableContent = forwardRef(
  ({ children, getFileName, selectedItem }, ref) => {
    const contentRef = useRef(null);

    useImperativeHandle(ref, () => ({
      download: async () => {
        if (!contentRef.current) return;

        try {
          const canvas = await html2canvas(contentRef.current, {
            backgroundColor: "white",
            scale: 2,
            useCORS: true,
            allowTaint: true,
            logging: false,
          });

          const fileName = getFileName
            ? getFileName(selectedItem)
            : `download-${Date.now()}.png`;

          const link = document.createElement("a");
          link.download = fileName;
          link.href = canvas.toDataURL("image/png");
          link.click();
        } catch (error) {
          console.error("Error generating image:", error);
        }
      },
    }));

    return <Box ref={contentRef}>{children}</Box>;
  },
);

DownloadableContent.displayName = "DownloadableContent";

export default DownloadableContent;
