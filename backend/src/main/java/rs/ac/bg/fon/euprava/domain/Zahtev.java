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
public class Zahtev {
    @Id
    @GeneratedValue
    private Long id;

    @Column(length = 2047)
    private String sadrzaj;

    private LocalDateTime vremePodnosenja;

    private LocalDateTime vremeRazresavanja;

    @ManyToOne
    @JoinColumn(name = "podnosilac_id")
    private Korisnik podnosilac;


    @Enumerated(EnumType.STRING)
    private StatusZahteva statusZahteva;

    @Enumerated(EnumType.STRING)
    private TipUsluge tipUsluge;

    private String fileCode;

}
