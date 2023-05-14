package rs.ac.bg.fon.euprava.files;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

public class FileDownloadUtil {

    public Resource getFileAsResource(String fileCode) throws IOException {
        Path dirPath = Paths.get("Dokumentacija");

        try (Stream<Path> files = Files.list(dirPath)) {
            Path foundFile = files.filter(file -> file.getFileName().toString().startsWith(fileCode))
                    .findFirst()
                    .orElseThrow(() -> new FileNotFoundException("File not found: " + fileCode));

            return new UrlResource(foundFile.toUri());
        } catch (IOException e) {
            throw new RuntimeException("Error reading file: " + e.getMessage(), e);
        }
    }
}
