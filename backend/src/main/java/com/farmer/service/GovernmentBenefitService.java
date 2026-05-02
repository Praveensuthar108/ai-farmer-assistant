package com.farmer.service;

import com.farmer.entity.GovernmentBenefit;
import com.farmer.exception.ResourceNotFoundException;
import com.farmer.repository.GovernmentBenefitRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
public class GovernmentBenefitService {

    @Autowired
    private GovernmentBenefitRepository benefitRepository;

    public List<GovernmentBenefit> getAllActiveBenefits() {
        log.info("Fetching all active government benefits");
        return benefitRepository.findByIsActiveTrue();
    }

    public List<GovernmentBenefit> getBenefitsByCategory(String category) {
        log.info("Fetching benefits by category: {}", category);
        return benefitRepository.findByCategoryAndIsActiveTrue(category);
    }

    public List<GovernmentBenefit> getBenefitsByState(String state) {
        log.info("Fetching benefits by state: {}", state);
        return benefitRepository.findByStateAndIsActiveTrue(state);
    }

    public List<GovernmentBenefit> getBenefitsByCategoryAndState(String category, String state) {
        log.info("Fetching benefits by category: {} and state: {}", category, state);
        return benefitRepository.findByCategoryAndStateAndIsActiveTrue(category, state);
    }

    public GovernmentBenefit getBenefitById(Long id) {
        log.info("Fetching benefit by id: {}", id);
        return benefitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Government benefit not found with id: " + id));
    }

    @Transactional
    public GovernmentBenefit createBenefit(GovernmentBenefit benefit) {
        log.info("Creating new government benefit: {}", benefit.getSchemeName());
        return benefitRepository.save(benefit);
    }

    @Transactional
    public GovernmentBenefit updateBenefit(Long id, GovernmentBenefit benefitDetails) {
        log.info("Updating government benefit with id: {}", id);
        GovernmentBenefit benefit = getBenefitById(id);
        
        benefit.setSchemeName(benefitDetails.getSchemeName());
        benefit.setSchemeNameHindi(benefitDetails.getSchemeNameHindi());
        benefit.setSchemeNameMarathi(benefitDetails.getSchemeNameMarathi());
        benefit.setCategory(benefitDetails.getCategory());
        benefit.setDescription(benefitDetails.getDescription());
        benefit.setDescriptionHindi(benefitDetails.getDescriptionHindi());
        benefit.setDescriptionMarathi(benefitDetails.getDescriptionMarathi());
        benefit.setEligibility(benefitDetails.getEligibility());
        benefit.setEligibilityHindi(benefitDetails.getEligibilityHindi());
        benefit.setEligibilityMarathi(benefitDetails.getEligibilityMarathi());
        benefit.setBenefits(benefitDetails.getBenefits());
        benefit.setBenefitsHindi(benefitDetails.getBenefitsHindi());
        benefit.setBenefitsMarathi(benefitDetails.getBenefitsMarathi());
        benefit.setHowToApply(benefitDetails.getHowToApply());
        benefit.setHowToApplyHindi(benefitDetails.getHowToApplyHindi());
        benefit.setHowToApplyMarathi(benefitDetails.getHowToApplyMarathi());
        benefit.setDocumentsRequired(benefitDetails.getDocumentsRequired());
        benefit.setDocumentsRequiredHindi(benefitDetails.getDocumentsRequiredHindi());
        benefit.setDocumentsRequiredMarathi(benefitDetails.getDocumentsRequiredMarathi());
        benefit.setOfficialWebsite(benefitDetails.getOfficialWebsite());
        benefit.setHelplineNumber(benefitDetails.getHelplineNumber());
        benefit.setState(benefitDetails.getState());
        benefit.setIsActive(benefitDetails.getIsActive());
        
        return benefitRepository.save(benefit);
    }

    @Transactional
    public void deleteBenefit(Long id) {
        log.info("Deleting government benefit with id: {}", id);
        GovernmentBenefit benefit = getBenefitById(id);
        benefitRepository.delete(benefit);
    }

    @Transactional
    public void deactivateBenefit(Long id) {
        log.info("Deactivating government benefit with id: {}", id);
        GovernmentBenefit benefit = getBenefitById(id);
        benefit.setIsActive(false);
        benefitRepository.save(benefit);
    }
}

// Made with Bob