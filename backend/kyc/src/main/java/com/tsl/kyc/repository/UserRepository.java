package com.tsl.kyc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.tsl.kyc.entity.User;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.username = :username")
    Optional<User> findByUsername(String username);
    
    Boolean existsByUsername(String username);
    
    List<User> findAllById(Iterable<Long> ids);
    
    @Query("SELECT u FROM User u WHERE u.companyProfile.id = :companyProfileId")
    List<User> findByCompanyProfileId(Integer companyProfileId);

}