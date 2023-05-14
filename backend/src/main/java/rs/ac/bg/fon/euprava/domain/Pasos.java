package rs.ac.bg.fon.euprava.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.NaturalId;

import java.time.LocalDate;

@Entity

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Pasos {

    @Id
    @GeneratedValue
    private Long id;

    @NaturalId
    private Long brojPasosa;

    @OneToOne
    @JoinColumn(name = "korisnik_id")
    private Korisnik korisnik;

    private LocalDate datumIzdavanja;

    private LocalDate datumVazenja;
}
