package com.ezvector.backend.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import com.ezvector.backend.model.Address;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class AddressRepositoryTests {
    @Autowired
    private AddressRepository addressRepository;

    @AfterEach
    public void clearDatabase() {
        addressRepository.deleteAll();
    }

    @Test
    public void testPersistAndLoadAddress(){
        String street = "street";
        String city = "city";
        String state = "state";
        String zipcode = "zipcode";
        Address testAddress = new Address();
        testAddress.setStreet(street);
        testAddress.setCity(city);
        testAddress.setState(state);
        testAddress.setZipCode(zipcode);

        //save address
        testAddress = addressRepository.save(testAddress);
        int addressId = testAddress.getAddressId();

        //read from db
        Address testAddressFromDb = addressRepository.findAddressByAddressId(addressId);

        //assert correct responses
        assertNotNull(testAddressFromDb);
        assertEquals(testAddress.getAddressId(), testAddressFromDb.getAddressId());
        assertEquals(testAddress.getStreet(), testAddressFromDb.getStreet());
        assertEquals(testAddress.getCity(), testAddressFromDb.getCity());
        assertEquals(testAddress.getState(), testAddressFromDb.getState());
        assertEquals(testAddress.getZipCode(), testAddressFromDb.getZipCode());
    }
    @Test
    public void testPersistAndLoadAddress2(){
        String street = "street2";
        String city = "city2";
        String state = "state2";
        String zipcode = "zipcode2";
        Address testAddress = new Address();
        testAddress.setStreet(street);
        testAddress.setCity(city);
        testAddress.setState(state);
        testAddress.setZipCode(zipcode);

        //save address
        testAddress = addressRepository.save(testAddress);
        int addressId = testAddress.getAddressId();

        //read from db
        Address testAddressFromDb = addressRepository.findAddressByAddressId(addressId);

        //assert correct responses
        assertNotNull(testAddressFromDb);
        assertEquals(testAddress.getAddressId(), testAddressFromDb.getAddressId());
        assertEquals(testAddress.getStreet(), testAddressFromDb.getStreet());
        assertEquals(testAddress.getCity(), testAddressFromDb.getCity());
        assertEquals(testAddress.getState(), testAddressFromDb.getState());
        assertEquals(testAddress.getZipCode(), testAddressFromDb.getZipCode());
    }
}
