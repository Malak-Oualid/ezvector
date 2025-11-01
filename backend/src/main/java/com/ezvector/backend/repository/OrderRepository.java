package com.ezvector.backend.repository;

import com.ezvector.backend.model.OrderItem;
import org.springframework.data.repository.CrudRepository;

public interface OrderRepository extends CrudRepository<OrderItem, Integer> {
}
