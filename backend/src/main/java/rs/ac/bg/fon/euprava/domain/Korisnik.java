package rs.ac.bg.fon.euprava.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.NaturalId;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode
@ToString(exclude = {"pasos", "licnaKarta", "password"})
public class Korisnik implements UserDetails {
    @Id
    @GeneratedValue
    private Long id;

    private String ime;
    private String prezime;
    private String email;

    @NaturalId
    private String jmbg;

    private Pol pol;


    @NaturalId
    private String username;

    @JsonIgnore
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToOne
    @JoinColumn(name = "pasos_id")
    @JsonIgnore
    private Pasos pasos;

    @OneToOne
    @JoinColumn(name = "licna_karta_id")
    @JsonIgnore
    private LicnaKarta licnaKarta;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(role);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
