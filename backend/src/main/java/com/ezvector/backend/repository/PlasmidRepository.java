package com.ezvector.backend.repository;

import com.ezvector.backend.model.Plasmid;
import org.springframework.data.repository.CrudRepository;

public interface PlasmidRepository extends CrudRepository<Plasmid, Integer> {
}
