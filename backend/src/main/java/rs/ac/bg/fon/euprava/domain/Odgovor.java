package rs.ac.bg.fon.euprava.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Odgovor {

    @Id
    @GeneratedValue
    private Long id;

    @Column(length = 2047)
    private String sadrzaj;

    @OneToOne
    @JoinColumn(name = "zahtev_id")
    private Zahtev zahtev;
}
