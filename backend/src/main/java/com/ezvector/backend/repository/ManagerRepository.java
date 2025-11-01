package com.ezvector.backend.repository;

import com.ezvector.backend.model.Manager;
import org.springframework.data.repository.CrudRepository;

public interface ManagerRepository extends CrudRepository<Manager, Integer> {
}
