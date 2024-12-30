package com.example.bank.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bank.Model.BankDetails;
import com.example.bank.Model.BankManagementModel;
import com.example.bank.Repository.BankDAO;
import com.example.bank.Repository.BankManagementDAO;
@Service
public class BranchService {

	@Autowired
	public BankDAO bankDAO;
	
	@Autowired
	public BankManagementDAO bmDAO;

	public void addBranch(BankManagementModel bmModel) {
		
		
		bmDAO.save(bmModel);
		List<BankDetails> bd=bmModel.getBankDetails();
		String bCode=bmModel.getBranchCode();
		for(BankDetails b:bd) {
			System.out.println(b.getBankName());
			b.setBranchCode(bCode);
			bankDAO.save(b);
		}
	}

	public List<BankManagementModel> getBranches() {
		
		List<BankManagementModel>bm=bmDAO.findAll();
		for(BankManagementModel b:bm) {
			List<BankDetails> bd=bankDAO.findBybranchCode(b.getBranchCode());
			b.setBankDetails(bd);
		}
		return bm;		
	}

	public BankManagementModel getBranchByCode(String branchCode) {
		
		BankManagementModel bm=bmDAO.findBybranchCode(branchCode);
		
		List<BankDetails> bd=bankDAO.findBybranchCode(branchCode);
		
		
		bm.setBankDetails(bd);
		
		return bm;
		
	}
}
