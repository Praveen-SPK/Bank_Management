package com.example.bank.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bank.Model.BankDetails;

@Repository
public interface BankDAO extends JpaRepository<BankDetails,Long>{

	

	List<BankDetails> findBybranchCode(String branchCode);



}
