package rs.ac.bg.fon.euprava.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Upozorenje {

    @Id
    @GeneratedValue
    private long id;

    private LocalDateTime vreme;

    private String sadrzaj;

    @ManyToOne
    @JoinColumn(name = "korisnik_id")
    private Korisnik korisnik;

    @OneToOne
    @JoinColumn(name = "broj_pasosa")
    private Pasos pasos;

    @OneToOne
    @JoinColumn(name = "broj_licne_karte")
    private LicnaKarta licnaKarta;

    //slanje na email
}
