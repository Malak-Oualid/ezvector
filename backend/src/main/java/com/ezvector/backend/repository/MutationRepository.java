package com.ezvector.backend.repository;

import com.ezvector.backend.model.Mutation;
import org.springframework.data.repository.CrudRepository;

public interface MutationRepository extends CrudRepository<Mutation, Integer> {
}
