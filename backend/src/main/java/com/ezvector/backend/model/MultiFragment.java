package com.ezvector.backend.model;/*PLEASE DO NOT EDIT THIS CODE*/
/*This code was generated using the UMPLE 1.35.0.7523.c616a4dce modeling language!*/


import java.util.*;
import java.sql.Date;

// line 80 "model.ump"
// line 165 "model.ump"
public class MultiFragment extends Plasmid
{

  //------------------------
  // STATIC VARIABLES
  //------------------------


  /**
   * change base price
   */
  public static final int BASE_PRICE = 12;

  //------------------------
  // MEMBER VARIABLES
  //------------------------

  //MultiFragment Associations
  private Fragment backbone;
  private List<Fragment> fragments;

  //------------------------
  // CONSTRUCTOR
  //------------------------

  public MultiFragment(String aPlasmidID, String aPlasmidName, String aPlasmidSequence, int aTotalPlasmidPrice, Date aDateCreated, boolean aIsSaved, Fragment aBackbone)
  {
    super(aPlasmidID, aPlasmidName, aPlasmidSequence, aTotalPlasmidPrice, aDateCreated, aIsSaved);
    boolean didAddBackbone = setBackbone(aBackbone);
    if (!didAddBackbone)
    {
      throw new RuntimeException("Unable to create multiFragment due to backbone. See https://manual.umple.org?RE002ViolationofAssociationMultiplicity.html");
    }
    fragments = new ArrayList<Fragment>();
  }

  //------------------------
  // INTERFACE
  //------------------------
  /* Code from template association_GetOne */
  public Fragment getBackbone()
  {
    return backbone;
  }
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
  /* Code from template association_SetOneToMany */
  public boolean setBackbone(Fragment aBackbone)
  {
    boolean wasSet = false;
    if (aBackbone == null)
    {
      return wasSet;
    }

    Fragment existingBackbone = backbone;
    backbone = aBackbone;
    if (existingBackbone != null && !existingBackbone.equals(aBackbone))
    {
      existingBackbone.removeMultiFragment(this);
    }
    backbone.addMultiFragment(this);
    wasSet = true;
    return wasSet;
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
  public Fragment addFragment(String aFragmentID, Fragment.DNAsource aDnaSource, String aSequence, boolean aToBeOrdered, boolean aValid, boolean aIsBackbone, SyntheticInsert aSyntheticInsert, OwnBackbone aOwnBackbone)
  {
    if (numberOfFragments() >= maximumNumberOfFragments())
    {
      return null;
    }
    else
    {
      return new Fragment(aFragmentID, aDnaSource, aSequence, aToBeOrdered, aValid, aIsBackbone, aSyntheticInsert, this, aOwnBackbone);
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

    MultiFragment existingMultiFragment = aFragment.getMultiFragment();
    boolean isNewMultiFragment = existingMultiFragment != null && !this.equals(existingMultiFragment);

    if (isNewMultiFragment && existingMultiFragment.numberOfFragments() <= minimumNumberOfFragments())
    {
      return wasAdded;
    }

    if (isNewMultiFragment)
    {
      aFragment.setMultiFragment(this);
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
    //Unable to remove aFragment, as it must always have a multiFragment
    if (this.equals(aFragment.getMultiFragment()))
    {
      return wasRemoved;
    }

    //multiFragment already at minimum (1)
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
    Fragment placeholderBackbone = backbone;
    this.backbone = null;
    if(placeholderBackbone != null)
    {
      placeholderBackbone.removeMultiFragment(this);
    }
    for(int i=fragments.size(); i > 0; i--)
    {
      Fragment aFragment = fragments.get(i - 1);
      aFragment.delete();
    }
    super.delete();
  }


  public String toString()
  {
    return super.toString() + "["+ "]" + System.getProperties().getProperty("line.separator") +
            "  " + "backbone = "+(getBackbone()!=null?Integer.toHexString(System.identityHashCode(getBackbone())):"null");
  }
}