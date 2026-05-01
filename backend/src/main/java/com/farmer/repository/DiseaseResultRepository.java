package com.farmer.repository;

import com.farmer.entity.DiseaseResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface DiseaseResultRepository extends JpaRepository<DiseaseResult, Long> {
    List<DiseaseResult> findByCropIdOrderByDetectedAtDesc(Long cropId);
    Optional<DiseaseResult> findFirstByCropIdOrderByDetectedAtDesc(Long cropId);
}

// Made with Bob
