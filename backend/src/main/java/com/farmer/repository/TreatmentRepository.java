package com.farmer.repository;

import com.farmer.entity.Treatment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface TreatmentRepository extends JpaRepository<Treatment, Long> {
    Optional<Treatment> findByDiseaseNameIgnoreCase(String diseaseName);
}

// Made with Bob
