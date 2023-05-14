package rs.ac.bg.fon.euprava.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDate;

@Entity

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Obavestenje {

    @Id
    @GeneratedValue
    private long id;

    private LocalDate vremeObjavljivanja;

    private String sadrzaj;

}
