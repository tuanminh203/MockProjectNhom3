package com.vti.repository;

import com.vti.entity.Tables;
import com.vti.entity.enums.TableStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TableRepository extends JpaRepository<Tables, Long> {
    List<Tables> findByStatus(TableStatus status);
    Optional<Tables> findById(long id);
}
