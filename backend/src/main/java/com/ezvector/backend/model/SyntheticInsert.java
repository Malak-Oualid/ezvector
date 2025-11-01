package com.ezvector.backend.model;/*PLEASE DO NOT EDIT THIS CODE*/
/*This code was generated using the UMPLE 1.35.0.7523.c616a4dce modeling language!*/


import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;

import java.sql.Date;
import java.util.*;

// line 72 "model.ump"
// line 160 "model.ump"
@Entity
public class SyntheticInsert extends Plasmid
{

    //------------------------
    // STATIC VARIABLES
    //------------------------


    /**
     * change base price
     */
    public static final int BASE_PRICE = 10;

    //------------------------
    // MEMBER VARIABLES
    //------------------------

    //SyntheticInsert Associations
    @OneToOne
    private Fragment syntheticInsert;
    @OneToOne
    private Fragment backbone;

    //------------------------
    // CONSTRUCTOR
    //------------------------

    public SyntheticInsert(int aPlasmidID, String aPlasmidName, String aPlasmidSequence, int aTotalPlasmidPrice, Date aDateCreated, boolean aIsSaved, Fragment aSyntheticInsert, Fragment aBackbone)
    {
        super(aPlasmidID, aPlasmidName, aPlasmidSequence, aTotalPlasmidPrice, aDateCreated, aIsSaved);
        if (!setSyntheticInsert(aSyntheticInsert))
        {
            throw new RuntimeException("Unable to create SyntheticInsert due to aSyntheticInsert. See https://manual.umple.org?RE002ViolationofAssociationMultiplicity.html");
        }
        if (!setBackbone(aBackbone))
        {
            throw new RuntimeException("Unable to create SyntheticInsert due to aBackbone. See https://manual.umple.org?RE002ViolationofAssociationMultiplicity.html");
        }
    }
    public SyntheticInsert(){}

    //------------------------
    // INTERFACE
    //------------------------
    /* Code from template association_GetOne */
    public Fragment getSyntheticInsert()
    {
        return syntheticInsert;
    }
    /* Code from template association_GetOne */
    public Fragment getBackbone()
    {
        return backbone;
    }
    /* Code from template association_SetUnidirectionalOne */
    public boolean setSyntheticInsert(Fragment aNewSyntheticInsert)
    {
        boolean wasSet = false;
        if (aNewSyntheticInsert != null)
        {
            syntheticInsert = aNewSyntheticInsert;
            wasSet = true;
        }
        return wasSet;
    }
    /* Code from template association_SetUnidirectionalOne */
    public boolean setBackbone(Fragment aNewBackbone)
    {
        boolean wasSet = false;
        if (aNewBackbone != null)
        {
            backbone = aNewBackbone;
            wasSet = true;
        }
        return wasSet;
    }

    public void delete()
    {
        syntheticInsert = null;
        backbone = null;
        super.delete();
    }


    public String toString()
    {
        return super.toString() + "["+ "]" + System.getProperties().getProperty("line.separator") +
                "  " + "syntheticInsert = "+(getSyntheticInsert()!=null?Integer.toHexString(System.identityHashCode(getSyntheticInsert())):"null") + System.getProperties().getProperty("line.separator") +
                "  " + "backbone = "+(getBackbone()!=null?Integer.toHexString(System.identityHashCode(getBackbone())):"null");
    }
}