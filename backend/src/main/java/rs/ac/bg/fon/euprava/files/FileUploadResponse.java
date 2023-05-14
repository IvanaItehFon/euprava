package rs.ac.bg.fon.euprava.files;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class FileUploadResponse {
    private String fileName;
    private Long size;
    private String downloadUri;
}
