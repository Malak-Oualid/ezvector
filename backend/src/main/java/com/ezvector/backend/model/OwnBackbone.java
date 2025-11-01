package com.ezvector.backend.model;/*PLEASE DO NOT EDIT THIS CODE*/
/*This code was generated using the UMPLE 1.35.0.7523.c616a4dce modeling language!*/


import java.util.*;
import java.sql.Date;

// line 88 "model.ump"
// line 170 "model.ump"
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
  private List<Fragment> fragments;

  //------------------------
  // CONSTRUCTOR
  //------------------------

  public OwnBackbone(int aPlasmidID, String aPlasmidName, String aPlasmidSequence, int aTotalPlasmidPrice, Date aDateCreated, boolean aIsSaved)
  {
    super(aPlasmidID, aPlasmidName, aPlasmidSequence, aTotalPlasmidPrice, aDateCreated, aIsSaved);
    fragments = new ArrayList<Fragment>();
  }

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
  /* Code from template association_IsNumberOfValidMethod */
  public boolean isNumberOfFragmentsValid()
  {
    boolean isValid = numberOfFragments() >= minimumNumberOfFragments() && numberOfFragments() <= maximumNumberOfFragments();
    return isValid;
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
  /* Code from template association_AddMNToOnlyOne */
  public Fragment addFragment(int aFragmentID, Fragment.DNAsource aDnaSource, String aSequence, boolean aToBeOrdered, boolean aValid, boolean aIsBackbone, SyntheticInsert aSyntheticInsert, MultiFragment aMultiFragment)
  {
    if (numberOfFragments() >= maximumNumberOfFragments())
    {
      return null;
    }
    else
    {
      return new Fragment(aFragmentID, aDnaSource, aSequence, aToBeOrdered, aValid, aIsBackbone, aSyntheticInsert, aMultiFragment, this);
    }
  }

  public boolean addFragment(Fragment aFragment)
  {
    boolean wasAdded = false;
    if (fragments.contains(aFragment)) { return false; }
    if (numberOfFragments() >= maximumNumberOfFragments())
    {
      return wasAdded;
    }

    OwnBackbone existingOwnBackbone = aFragment.getOwnBackbone();
    boolean isNewOwnBackbone = existingOwnBackbone != null && !this.equals(existingOwnBackbone);

    if (isNewOwnBackbone && existingOwnBackbone.numberOfFragments() <= minimumNumberOfFragments())
    {
      return wasAdded;
    }

    if (isNewOwnBackbone)
    {
      aFragment.setOwnBackbone(this);
    }
    else
    {
      fragments.add(aFragment);
    }
    wasAdded = true;
    return wasAdded;
  }

  public boolean removeFragment(Fragment aFragment)
  {
    boolean wasRemoved = false;
    //Unable to remove aFragment, as it must always have a ownBackbone
    if (this.equals(aFragment.getOwnBackbone()))
    {
      return wasRemoved;
    }

    //ownBackbone already at minimum (1)
    if (numberOfFragments() <= minimumNumberOfFragments())
    {
      return wasRemoved;
    }
    fragments.remove(aFragment);
    wasRemoved = true;
    return wasRemoved;
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
    for(int i=fragments.size(); i > 0; i--)
    {
      Fragment aFragment = fragments.get(i - 1);
      aFragment.delete();
    }
    super.delete();
  }


  public String toString()
  {
    return super.toString() + "["+ "]";
  }
}