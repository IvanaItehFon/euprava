package rs.ac.bg.fon.euprava.auth;

import lombok.*;


@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class LoginRequest {
  private String username;
  private String password;
}
