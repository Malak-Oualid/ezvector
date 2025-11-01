package com.ezvector.backend.repository;

import com.ezvector.backend.model.Address;
import org.springframework.data.repository.CrudRepository;

public interface AddressRepository extends CrudRepository<Address, Integer> {

}
