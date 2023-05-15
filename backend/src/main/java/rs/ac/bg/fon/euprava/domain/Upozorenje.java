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

    @Column(length = 2047)
    private String sadrzaj;

    @ManyToOne
    @JoinColumn(name = "korisnik_id")
    private Korisnik korisnik;

    @OneToOne
    @JoinColumn(name = "pasos_id")
    private Pasos pasos;

    @OneToOne
    @JoinColumn(name = "licna_karta_id")
    private LicnaKarta licnaKarta;

    //slanje na email
}
