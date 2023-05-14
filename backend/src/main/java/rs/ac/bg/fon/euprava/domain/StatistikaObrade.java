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
public class StatistikaObrade {

    @Id
    @GeneratedValue
    private long id;

    private LocalDateTime pocetkaObrade;

    private LocalDateTime krajObrade;

    private boolean obradjeno;

    @OneToOne
    @JoinColumn(name = "zahtev_id")
    private Zahtev zahtev;
}
