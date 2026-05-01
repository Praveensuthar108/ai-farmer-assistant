package com.farmer.repository;

import com.farmer.entity.ChatHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ChatHistoryRepository extends JpaRepository<ChatHistory, Long> {
    List<ChatHistory> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<ChatHistory> findTop10ByUserIdOrderByCreatedAtDesc(Long userId);
}

// Made with Bob
