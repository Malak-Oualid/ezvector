package com.ezvector.backend.repository;

import com.ezvector.backend.model.Primer;
import org.springframework.data.repository.CrudRepository;

public interface PrimerRepository extends CrudRepository<Primer, Integer> {
}
