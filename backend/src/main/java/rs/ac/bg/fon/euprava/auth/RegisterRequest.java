package rs.ac.bg.fon.euprava.auth;

import lombok.*;
import rs.ac.bg.fon.euprava.domain.LicnaKarta;
import rs.ac.bg.fon.euprava.domain.Pasos;
import rs.ac.bg.fon.euprava.domain.Pol;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class RegisterRequest {
  private String ime;
  private String prezime;
  private String email;
  private String jmbg;
  private Pol pol;
  private String username;
  private String password;
  private LicnaKarta licnaKarta;
  private Pasos pasos;
}
