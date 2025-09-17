package com.vti.repository;

import com.vti.entity.Tables;
import com.vti.entity.enums.TableStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TableRepository extends JpaRepository<Tables, Long> {
    List<Tables> findByStatus(TableStatus status);
    Optional<Tables> findById(long id);
}
