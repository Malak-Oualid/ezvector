package com.ezvector.backend.model;/*PLEASE DO NOT EDIT THIS CODE*/
/*This code was generated using the UMPLE 1.35.0.7523.c616a4dce modeling language!*/


import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;

import java.util.*;
import java.sql.Date;

// line 88 "model.ump"
// line 170 "model.ump"
@Entity
public class OwnBackbone extends Plasmid
{

    //------------------------
    // STATIC VARIABLES
    //------------------------


    /**
     * change base price
     */
    public static final int BASE_PRICE = 14;

    //------------------------
    // MEMBER VARIABLES
    //------------------------

    //OwnBackbone Associations
    @OneToMany
    private List<Fragment> fragments;

    //------------------------
    // CONSTRUCTOR
    //------------------------

    public OwnBackbone(int aPlasmidID, String aPlasmidName, String aPlasmidSequence, int aTotalPlasmidPrice, Date aDateCreated, boolean aIsSaved, Fragment... allFragments)
    {
        super(aPlasmidID, aPlasmidName, aPlasmidSequence, aTotalPlasmidPrice, aDateCreated, aIsSaved);
        fragments = new ArrayList<Fragment>();
        boolean didAddFragments = setFragments(allFragments);
        if (!didAddFragments)
        {
            throw new RuntimeException("Unable to create OwnBackbone, must have 1 to 5 fragments. See https://manual.umple.org?RE002ViolationofAssociationMultiplicity.html");
        }
    }
    public OwnBackbone(){}

    //------------------------
    // INTERFACE
    //------------------------
    /* Code from template association_GetMany */
    public Fragment getFragment(int index)
    {
        Fragment aFragment = fragments.get(index);
        return aFragment;
    }

    public List<Fragment> getFragments()
    {
        List<Fragment> newFragments = Collections.unmodifiableList(fragments);
        return newFragments;
    }

    public int numberOfFragments()
    {
        int number = fragments.size();
        return number;
    }

    public boolean hasFragments()
    {
        boolean has = fragments.size() > 0;
        return has;
    }

    public int indexOfFragment(Fragment aFragment)
    {
        int index = fragments.indexOf(aFragment);
        return index;
    }
    /* Code from template association_MinimumNumberOfMethod */
    public static int minimumNumberOfFragments()
    {
        return 1;
    }
    /* Code from template association_MaximumNumberOfMethod */
    public static int maximumNumberOfFragments()
    {
        return 5;
    }
    /* Code from template association_AddUnidirectionalMN */
    public boolean addFragment(Fragment aFragment)
    {
        boolean wasAdded = false;
        if (fragments.contains(aFragment)) { return false; }
        if (numberOfFragments() < maximumNumberOfFragments())
        {
            fragments.add(aFragment);
            wasAdded = true;
        }
        return wasAdded;
    }

    public boolean removeFragment(Fragment aFragment)
    {
        boolean wasRemoved = false;
        if (!fragments.contains(aFragment))
        {
            return wasRemoved;
        }

        if (numberOfFragments() <= minimumNumberOfFragments())
        {
            return wasRemoved;
        }

        fragments.remove(aFragment);
        wasRemoved = true;
        return wasRemoved;
    }
    /* Code from template association_SetUnidirectionalMN */
    public boolean setFragments(Fragment... newFragments)
    {
        boolean wasSet = false;
        ArrayList<Fragment> verifiedFragments = new ArrayList<Fragment>();
        for (Fragment aFragment : newFragments)
        {
            if (verifiedFragments.contains(aFragment))
            {
                continue;
            }
            verifiedFragments.add(aFragment);
        }

        if (verifiedFragments.size() != newFragments.length || verifiedFragments.size() < minimumNumberOfFragments() || verifiedFragments.size() > maximumNumberOfFragments())
        {
            return wasSet;
        }

        fragments.clear();
        fragments.addAll(verifiedFragments);
        wasSet = true;
        return wasSet;
    }
    /* Code from template association_AddIndexControlFunctions */
    public boolean addFragmentAt(Fragment aFragment, int index)
    {
        boolean wasAdded = false;
        if(addFragment(aFragment))
        {
            if(index < 0 ) { index = 0; }
            if(index > numberOfFragments()) { index = numberOfFragments() - 1; }
            fragments.remove(aFragment);
            fragments.add(index, aFragment);
            wasAdded = true;
        }
        return wasAdded;
    }

    public boolean addOrMoveFragmentAt(Fragment aFragment, int index)
    {
        boolean wasAdded = false;
        if(fragments.contains(aFragment))
        {
            if(index < 0 ) { index = 0; }
            if(index > numberOfFragments()) { index = numberOfFragments() - 1; }
            fragments.remove(aFragment);
            fragments.add(index, aFragment);
            wasAdded = true;
        }
        else
        {
            wasAdded = addFragmentAt(aFragment, index);
        }
        return wasAdded;
    }

    public void delete()
    {
        fragments.clear();
        super.delete();
    }


    public String toString()
    {
        return super.toString() + "["+ "]";
    }
}