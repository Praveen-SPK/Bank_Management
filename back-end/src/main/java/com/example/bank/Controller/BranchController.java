package com.example.bank.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.bank.Model.BankDetails;
import com.example.bank.Model.BankManagementModel;

import com.example.bank.Service.BranchService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class BranchController {
	
	@Autowired
	public BranchService branchService;
	
	@PostMapping("/addBranch")
	public ResponseEntity<?> addBranch(@RequestBody BankManagementModel bmModel){
	
		branchService.addBranch(bmModel);
		return ResponseEntity.ok("success") ;
		
	}
	@GetMapping("/allBranches")
	public List<BankManagementModel> getBranches(){
		return branchService.getBranches();
	}
	
	@GetMapping("/editbranch/{branchCode}")
	public BankManagementModel getBranchByCode(@PathVariable("branchCode") String branchCode)
	{
		System.out.println(branchCode);
		return branchService.getBranchByCode(branchCode); 
	}
	@GetMapping("/viewbranch/{branchCode}")
	public BankManagementModel getBranchCode(@PathVariable("branchCode") String branchCode)
	{
		System.out.println(branchCode);
		return branchService.getBranchByCode(branchCode); 
	}
	@GetMapping("/historybranch/{branchCode}")
	public BankManagementModel getAllBranch(@PathVariable("branchCode") String branchCode)
	{
		System.out.println(branchCode);
		return branchService.getBranchByCode(branchCode); 
	}
	
}
