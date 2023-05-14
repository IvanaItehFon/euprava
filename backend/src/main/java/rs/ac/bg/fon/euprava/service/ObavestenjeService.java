package rs.ac.bg.fon.euprava.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.euprava.domain.Obavestenje;
import rs.ac.bg.fon.euprava.repository.ObavestenjeRepository;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ObavestenjeService {

    private final ObavestenjeRepository obavestenjeRepository;

    public Page<Obavestenje> getAll(Pageable pageable) {
        return obavestenjeRepository.findAll(pageable); //.stream().sorted(Comparator.comparing(Obavestenje::getVremeObjavljivanja).reversed());
    }

    public Obavestenje getById(long id) {
        return obavestenjeRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public Obavestenje postaviObavestenje(Obavestenje obavestenje) {
        obavestenje.setVremeObjavljivanja(LocalDateTime.now());
        return obavestenjeRepository.save(obavestenje);
    }
}
