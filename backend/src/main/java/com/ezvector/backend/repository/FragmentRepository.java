package com.ezvector.backend.repository;

import com.ezvector.backend.model.Fragment;
import org.springframework.data.repository.CrudRepository;

public interface FragmentRepository extends CrudRepository<Fragment, Integer> {
}
