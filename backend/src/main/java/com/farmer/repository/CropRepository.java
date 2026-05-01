package com.farmer.repository;

import com.farmer.entity.Crop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CropRepository extends JpaRepository<Crop, Long> {
    List<Crop> findByUserIdOrderByUploadedAtDesc(Long userId);
}

// Made with Bob
