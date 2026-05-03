package com.farmer.repository;

import com.farmer.entity.GovernmentBenefit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GovernmentBenefitRepository extends JpaRepository<GovernmentBenefit, Long> {
    
    List<GovernmentBenefit> findByIsActiveTrue();
    
    List<GovernmentBenefit> findByCategoryAndIsActiveTrue(String category);
    
    List<GovernmentBenefit> findByStateAndIsActiveTrue(String state);
    
    List<GovernmentBenefit> findByCategoryAndStateAndIsActiveTrue(String category, String state);
}

// Made with Bob