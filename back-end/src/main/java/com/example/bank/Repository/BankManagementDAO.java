package com.example.bank.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bank.Model.BankDetails;
import com.example.bank.Model.BankManagementModel;

@Repository
public interface BankManagementDAO extends JpaRepository<BankManagementModel,Long>{

	

	BankManagementModel findBybranchCode(String branchCode);

	
}
