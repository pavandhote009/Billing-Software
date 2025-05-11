package in.project.billingSoftware.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileuploadServiceImpl implements FileUploadService {

    private static final String UPLOAD_DIR = "uploaded-files/";

    @Override
    public String uploadFile(MultipartFile file) {
        String filenameExtension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
        String uniqueFilename = UUID.randomUUID().toString() + "." + filenameExtension;
        File uploadDir = new File(UPLOAD_DIR);

        if (!uploadDir.exists()) uploadDir.mkdirs();

        try {
            File newFile = new File(uploadDir, uniqueFilename);
            try (FileOutputStream fos = new FileOutputStream(newFile)) {
                fos.write(file.getBytes());
            }
            // You can store this relative path in the database
            return UPLOAD_DIR + uniqueFilename;
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error saving file locally", e);
        }
    }

    @Override
    public boolean deleteFile(String imgPath) {
        File file = new File(imgPath);
        return file.exists() && file.delete();
    }
}
