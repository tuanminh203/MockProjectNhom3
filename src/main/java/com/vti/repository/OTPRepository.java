package com.vti.repository;

import com.vti.entity.OTP;
import com.vti.entity.enums.OTPType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OTPRepository extends JpaRepository<OTP,Long> {
    Optional<OTP> findByEmailAndCodeAndType(String email, String code, OTPType type);
    void deleteByEmailAndType(String email, OTPType type);
}
