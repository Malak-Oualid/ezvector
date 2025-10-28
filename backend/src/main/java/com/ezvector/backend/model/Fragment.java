package com.ezvector.backend.model;/*PLEASE DO NOT EDIT THIS CODE*/
/*This code was generated using the UMPLE 1.35.0.7523.c616a4dce modeling language!*/


import java.util.*;
import java.sql.Date;

// line 107 "model.ump"
// line 185 "model.ump"
public class Fragment
{

  //------------------------
  // ENUMERATIONS
  //------------------------

  public enum DNAsource { GENOMIC, PLASMID, SYNTHETIC }

  //------------------------
  // MEMBER VARIABLES
  //------------------------

  //Fragment Attributes
  private String fragmentID;
  private DNAsource dnaSource;
  private String sequence;
  private boolean toBeOrdered;
  private boolean valid;
  private boolean isBackbone;

  //Fragment Associations
  private Customer customer;
  private SyntheticInsert syntheticInsert;
  private List<SyntheticInsert> syntheticInserts;
  private List<MultiFragment> multiFragments;
  private MultiFragment multiFragment;
  private OwnBackbone ownBackbone;
  private List<Mutagenesis> mutagenesis;

  //------------------------
  // CONSTRUCTOR
  //------------------------

  public Fragment(String aFragmentID, DNAsource aDnaSource, String aSequence, boolean aToBeOrdered, boolean aValid, boolean aIsBackbone, SyntheticInsert aSyntheticInsert, MultiFragment aMultiFragment, OwnBackbone aOwnBackbone)
  {
    fragmentID = aFragmentID;
    dnaSource = aDnaSource;
    sequence = aSequence;
    toBeOrdered = aToBeOrdered;
    valid = aValid;
    isBackbone = aIsBackbone;
    if (aSyntheticInsert == null || aSyntheticInsert.getSyntheticInsert() != null)
    {
      throw new RuntimeException("Unable to create Fragment due to aSyntheticInsert. See https://manual.umple.org?RE002ViolationofAssociationMultiplicity.html");
    }
    syntheticInsert = aSyntheticInsert;
    syntheticInserts = new ArrayList<SyntheticInsert>();
    multiFragments = new ArrayList<MultiFragment>();
    boolean didAddMultiFragment = setMultiFragment(aMultiFragment);
    if (!didAddMultiFragment)
    {
      throw new RuntimeException("Unable to create fragment due to multiFragment. See https://manual.umple.org?RE002ViolationofAssociationMultiplicity.html");
    }
    boolean didAddOwnBackbone = setOwnBackbone(aOwnBackbone);
    if (!didAddOwnBackbone)
    {
      throw new RuntimeException("Unable to create fragment due to ownBackbone. See https://manual.umple.org?RE002ViolationofAssociationMultiplicity.html");
    }
    mutagenesis = new ArrayList<Mutagenesis>();
  }

  public Fragment(String aFragmentID, DNAsource aDnaSource, String aSequence, boolean aToBeOrdered, boolean aValid, boolean aIsBackbone, String aPlasmidIDForSyntheticInsert, String aPlasmidNameForSyntheticInsert, String aPlasmidSequenceForSyntheticInsert, int aTotalPlasmidPriceForSyntheticInsert, Date aDateCreatedForSyntheticInsert, boolean aIsSavedForSyntheticInsert, Fragment aBackboneForSyntheticInsert, MultiFragment aMultiFragment, OwnBackbone aOwnBackbone)
  {
    fragmentID = aFragmentID;
    dnaSource = aDnaSource;
    sequence = aSequence;
    toBeOrdered = aToBeOrdered;
    valid = aValid;
    isBackbone = aIsBackbone;
    syntheticInsert = new SyntheticInsert(aPlasmidIDForSyntheticInsert, aPlasmidNameForSyntheticInsert, aPlasmidSequenceForSyntheticInsert, aTotalPlasmidPriceForSyntheticInsert, aDateCreatedForSyntheticInsert, aIsSavedForSyntheticInsert, this, aBackboneForSyntheticInsert);
    syntheticInserts = new ArrayList<SyntheticInsert>();
    multiFragments = new ArrayList<MultiFragment>();
    boolean didAddMultiFragment = setMultiFragment(aMultiFragment);
    if (!didAddMultiFragment)
    {
      throw new RuntimeException("Unable to create fragment due to multiFragment. See https://manual.umple.org?RE002ViolationofAssociationMultiplicity.html");
    }
    boolean didAddOwnBackbone = setOwnBackbone(aOwnBackbone);
    if (!didAddOwnBackbone)
    {
      throw new RuntimeException("Unable to create fragment due to ownBackbone. See https://manual.umple.org?RE002ViolationofAssociationMultiplicity.html");
    }
    mutagenesis = new ArrayList<Mutagenesis>();
  }
    public Fragment()
    {
    }

  //------------------------
  // INTERFACE
  //------------------------

  public boolean setFragmentID(String aFragmentID)
  {
    boolean wasSet = false;
    fragmentID = aFragmentID;
    wasSet = true;
    return wasSet;
  }

  public boolean setDnaSource(DNAsource aDnaSource)
  {
    boolean wasSet = false;
    dnaSource = aDnaSource;
    wasSet = true;
    return wasSet;
  }

  public boolean setSequence(String aSequence)
  {
    boolean wasSet = false;
    sequence = aSequence;
    wasSet = true;
    return wasSet;
  }

  public boolean setToBeOrdered(boolean aToBeOrdered)
  {
    boolean wasSet = false;
    toBeOrdered = aToBeOrdered;
    wasSet = true;
    return wasSet;
  }

  public boolean setValid(boolean aValid)
  {
    boolean wasSet = false;
    valid = aValid;
    wasSet = true;
    return wasSet;
  }

  public boolean setIsBackbone(boolean aIsBackbone)
  {
    boolean wasSet = false;
    isBackbone = aIsBackbone;
    wasSet = true;
    return wasSet;
  }

  public String getFragmentID()
  {
    return fragmentID;
  }

  public DNAsource getDnaSource()
  {
    return dnaSource;
  }

  public String getSequence()
  {
    return sequence;
  }

  public boolean getToBeOrdered()
  {
    return toBeOrdered;
  }

  public boolean getValid()
  {
    return valid;
  }

  public boolean getIsBackbone()
  {
    return isBackbone;
  }
  /* Code from template attribute_IsBoolean */
  public boolean isToBeOrdered()
  {
    return toBeOrdered;
  }
  /* Code from template attribute_IsBoolean */
  public boolean isValid()
  {
    return valid;
  }
  /* Code from template attribute_IsBoolean */
  public boolean isIsBackbone()
  {
    return isBackbone;
  }
  /* Code from template association_GetOne */
  public Customer getCustomer()
  {
    return customer;
  }

  public boolean hasCustomer()
  {
    boolean has = customer != null;
    return has;
  }
  /* Code from template association_GetOne */
  public SyntheticInsert getSyntheticInsert()
  {
    return syntheticInsert;
  }
  /* Code from template association_GetMany */
  public SyntheticInsert getSyntheticInsert(int index)
  {
    SyntheticInsert aSyntheticInsert = syntheticInserts.get(index);
    return aSyntheticInsert;
  }

  public List<SyntheticInsert> getSyntheticInserts()
  {
    List<SyntheticInsert> newSyntheticInserts = Collections.unmodifiableList(syntheticInserts);
    return newSyntheticInserts;
  }

  public int numberOfSyntheticInserts()
  {
    int number = syntheticInserts.size();
    return number;
  }

  public boolean hasSyntheticInserts()
  {
    boolean has = syntheticInserts.size() > 0;
    return has;
  }

  public int indexOfSyntheticInsert(SyntheticInsert aSyntheticInsert)
  {
    int index = syntheticInserts.indexOf(aSyntheticInsert);
    return index;
  }
  /* Code from template association_GetMany */
  public MultiFragment getMultiFragment(int index)
  {
    MultiFragment aMultiFragment = multiFragments.get(index);
    return aMultiFragment;
  }

  public List<MultiFragment> getMultiFragments()
  {
    List<MultiFragment> newMultiFragments = Collections.unmodifiableList(multiFragments);
    return newMultiFragments;
  }

  public int numberOfMultiFragments()
  {
    int number = multiFragments.size();
    return number;
  }

  public boolean hasMultiFragments()
  {
    boolean has = multiFragments.size() > 0;
    return has;
  }

  public int indexOfMultiFragment(MultiFragment aMultiFragment)
  {
    int index = multiFragments.indexOf(aMultiFragment);
    return index;
  }
  /* Code from template association_GetOne */
  public MultiFragment getMultiFragment()
  {
    return multiFragment;
  }
  /* Code from template association_GetOne */
  public OwnBackbone getOwnBackbone()
  {
    return ownBackbone;
  }
  /* Code from template association_GetMany */
  public Mutagenesis getMutagenesi(int index)
  {
    Mutagenesis aMutagenesi = mutagenesis.get(index);
    return aMutagenesi;
  }

  public List<Mutagenesis> getMutagenesis()
  {
    List<Mutagenesis> newMutagenesis = Collections.unmodifiableList(mutagenesis);
    return newMutagenesis;
  }

  public int numberOfMutagenesis()
  {
    int number = mutagenesis.size();
    return number;
  }

  public boolean hasMutagenesis()
  {
    boolean has = mutagenesis.size() > 0;
    return has;
  }

  public int indexOfMutagenesi(Mutagenesis aMutagenesi)
  {
    int index = mutagenesis.indexOf(aMutagenesi);
    return index;
  }
  /* Code from template association_SetOptionalOneToMany */
  public boolean setCustomer(Customer aCustomer)
  {
    boolean wasSet = false;
    Customer existingCustomer = customer;
    customer = aCustomer;
    if (existingCustomer != null && !existingCustomer.equals(aCustomer))
    {
      existingCustomer.removeCustomerBackbone(this);
    }
    if (aCustomer != null)
    {
      aCustomer.addCustomerBackbone(this);
    }
    wasSet = true;
    return wasSet;
  }
  /* Code from template association_MinimumNumberOfMethod */
  public static int minimumNumberOfSyntheticInserts()
  {
    return 0;
  }
  /* Code from template association_AddManyToOne */
  public SyntheticInsert addSyntheticInsert(String aPlasmidID, String aPlasmidName, String aPlasmidSequence, int aTotalPlasmidPrice, Date aDateCreated, boolean aIsSaved, Fragment aSyntheticInsert)
  {
    return new SyntheticInsert(aPlasmidID, aPlasmidName, aPlasmidSequence, aTotalPlasmidPrice, aDateCreated, aIsSaved, aSyntheticInsert, this);
  }

  public boolean addSyntheticInsert(SyntheticInsert aSyntheticInsert)
  {
    boolean wasAdded = false;
    if (syntheticInserts.contains(aSyntheticInsert)) { return false; }
    Fragment existingBackbone = aSyntheticInsert.getBackbone();
    boolean isNewBackbone = existingBackbone != null && !this.equals(existingBackbone);
    if (isNewBackbone)
    {
      aSyntheticInsert.setBackbone(this);
    }
    else
    {
      syntheticInserts.add(aSyntheticInsert);
    }
    wasAdded = true;
    return wasAdded;
  }

  public boolean removeSyntheticInsert(SyntheticInsert aSyntheticInsert)
  {
    boolean wasRemoved = false;
    //Unable to remove aSyntheticInsert, as it must always have a backbone
    if (!this.equals(aSyntheticInsert.getBackbone()))
    {
      syntheticInserts.remove(aSyntheticInsert);
      wasRemoved = true;
    }
    return wasRemoved;
  }
  /* Code from template association_AddIndexControlFunctions */
  public boolean addSyntheticInsertAt(SyntheticInsert aSyntheticInsert, int index)
  {  
    boolean wasAdded = false;
    if(addSyntheticInsert(aSyntheticInsert))
    {
      if(index < 0 ) { index = 0; }
      if(index > numberOfSyntheticInserts()) { index = numberOfSyntheticInserts() - 1; }
      syntheticInserts.remove(aSyntheticInsert);
      syntheticInserts.add(index, aSyntheticInsert);
      wasAdded = true;
    }
    return wasAdded;
  }

  public boolean addOrMoveSyntheticInsertAt(SyntheticInsert aSyntheticInsert, int index)
  {
    boolean wasAdded = false;
    if(syntheticInserts.contains(aSyntheticInsert))
    {
      if(index < 0 ) { index = 0; }
      if(index > numberOfSyntheticInserts()) { index = numberOfSyntheticInserts() - 1; }
      syntheticInserts.remove(aSyntheticInsert);
      syntheticInserts.add(index, aSyntheticInsert);
      wasAdded = true;
    } 
    else 
    {
      wasAdded = addSyntheticInsertAt(aSyntheticInsert, index);
    }
    return wasAdded;
  }
  /* Code from template association_MinimumNumberOfMethod */
  public static int minimumNumberOfMultiFragments()
  {
    return 0;
  }
  /* Code from template association_AddManyToOne */
  public MultiFragment addMultiFragment(String aPlasmidID, String aPlasmidName, String aPlasmidSequence, int aTotalPlasmidPrice, Date aDateCreated, boolean aIsSaved)
  {
    return new MultiFragment(aPlasmidID, aPlasmidName, aPlasmidSequence, aTotalPlasmidPrice, aDateCreated, aIsSaved, this);
  }

  public boolean addMultiFragment(MultiFragment aMultiFragment)
  {
    boolean wasAdded = false;
    if (multiFragments.contains(aMultiFragment)) { return false; }
    Fragment existingBackbone = aMultiFragment.getBackbone();
    boolean isNewBackbone = existingBackbone != null && !this.equals(existingBackbone);
    if (isNewBackbone)
    {
      aMultiFragment.setBackbone(this);
    }
    else
    {
      multiFragments.add(aMultiFragment);
    }
    wasAdded = true;
    return wasAdded;
  }

  public boolean removeMultiFragment(MultiFragment aMultiFragment)
  {
    boolean wasRemoved = false;
    //Unable to remove aMultiFragment, as it must always have a backbone
    if (!this.equals(aMultiFragment.getBackbone()))
    {
      multiFragments.remove(aMultiFragment);
      wasRemoved = true;
    }
    return wasRemoved;
  }
  /* Code from template association_AddIndexControlFunctions */
  public boolean addMultiFragmentAt(MultiFragment aMultiFragment, int index)
  {  
    boolean wasAdded = false;
    if(addMultiFragment(aMultiFragment))
    {
      if(index < 0 ) { index = 0; }
      if(index > numberOfMultiFragments()) { index = numberOfMultiFragments() - 1; }
      multiFragments.remove(aMultiFragment);
      multiFragments.add(index, aMultiFragment);
      wasAdded = true;
    }
    return wasAdded;
  }

  public boolean addOrMoveMultiFragmentAt(MultiFragment aMultiFragment, int index)
  {
    boolean wasAdded = false;
    if(multiFragments.contains(aMultiFragment))
    {
      if(index < 0 ) { index = 0; }
      if(index > numberOfMultiFragments()) { index = numberOfMultiFragments() - 1; }
      multiFragments.remove(aMultiFragment);
      multiFragments.add(index, aMultiFragment);
      wasAdded = true;
    } 
    else 
    {
      wasAdded = addMultiFragmentAt(aMultiFragment, index);
    }
    return wasAdded;
  }
  /* Code from template association_SetOneToAtMostN */
  public boolean setMultiFragment(MultiFragment aMultiFragment)
  {
    boolean wasSet = false;
    //Must provide multiFragment to fragment
    if (aMultiFragment == null)
    {
      return wasSet;
    }

    //multiFragment already at maximum (5)
    if (aMultiFragment.numberOfFragments() >= MultiFragment.maximumNumberOfFragments())
    {
      return wasSet;
    }
    
    MultiFragment existingMultiFragment = multiFragment;
    multiFragment = aMultiFragment;
    if (existingMultiFragment != null && !existingMultiFragment.equals(aMultiFragment))
    {
      boolean didRemove = existingMultiFragment.removeFragment(this);
      if (!didRemove)
      {
        multiFragment = existingMultiFragment;
        return wasSet;
      }
    }
    multiFragment.addFragment(this);
    wasSet = true;
    return wasSet;
  }
  /* Code from template association_SetOneToAtMostN */
  public boolean setOwnBackbone(OwnBackbone aOwnBackbone)
  {
    boolean wasSet = false;
    //Must provide ownBackbone to fragment
    if (aOwnBackbone == null)
    {
      return wasSet;
    }

    //ownBackbone already at maximum (5)
    if (aOwnBackbone.numberOfFragments() >= OwnBackbone.maximumNumberOfFragments())
    {
      return wasSet;
    }
    
    OwnBackbone existingOwnBackbone = ownBackbone;
    ownBackbone = aOwnBackbone;
    if (existingOwnBackbone != null && !existingOwnBackbone.equals(aOwnBackbone))
    {
      boolean didRemove = existingOwnBackbone.removeFragment(this);
      if (!didRemove)
      {
        ownBackbone = existingOwnBackbone;
        return wasSet;
      }
    }
    ownBackbone.addFragment(this);
    wasSet = true;
    return wasSet;
  }
  /* Code from template association_MinimumNumberOfMethod */
  public static int minimumNumberOfMutagenesis()
  {
    return 0;
  }
  /* Code from template association_AddManyToOne */
  public Mutagenesis addMutagenesi(String aPlasmidID, String aPlasmidName, String aPlasmidSequence, int aTotalPlasmidPrice, Date aDateCreated, boolean aIsSaved)
  {
    return new Mutagenesis(aPlasmidID, aPlasmidName, aPlasmidSequence, aTotalPlasmidPrice, aDateCreated, aIsSaved, this);
  }

  public boolean addMutagenesi(Mutagenesis aMutagenesi)
  {
    boolean wasAdded = false;
    if (mutagenesis.contains(aMutagenesi)) { return false; }
    Fragment existingBackbone = aMutagenesi.getBackbone();
    boolean isNewBackbone = existingBackbone != null && !this.equals(existingBackbone);
    if (isNewBackbone)
    {
      aMutagenesi.setBackbone(this);
    }
    else
    {
      mutagenesis.add(aMutagenesi);
    }
    wasAdded = true;
    return wasAdded;
  }

  public boolean removeMutagenesi(Mutagenesis aMutagenesi)
  {
    boolean wasRemoved = false;
    //Unable to remove aMutagenesi, as it must always have a backbone
    if (!this.equals(aMutagenesi.getBackbone()))
    {
      mutagenesis.remove(aMutagenesi);
      wasRemoved = true;
    }
    return wasRemoved;
  }
  /* Code from template association_AddIndexControlFunctions */
  public boolean addMutagenesiAt(Mutagenesis aMutagenesi, int index)
  {  
    boolean wasAdded = false;
    if(addMutagenesi(aMutagenesi))
    {
      if(index < 0 ) { index = 0; }
      if(index > numberOfMutagenesis()) { index = numberOfMutagenesis() - 1; }
      mutagenesis.remove(aMutagenesi);
      mutagenesis.add(index, aMutagenesi);
      wasAdded = true;
    }
    return wasAdded;
  }

  public boolean addOrMoveMutagenesiAt(Mutagenesis aMutagenesi, int index)
  {
    boolean wasAdded = false;
    if(mutagenesis.contains(aMutagenesi))
    {
      if(index < 0 ) { index = 0; }
      if(index > numberOfMutagenesis()) { index = numberOfMutagenesis() - 1; }
      mutagenesis.remove(aMutagenesi);
      mutagenesis.add(index, aMutagenesi);
      wasAdded = true;
    } 
    else 
    {
      wasAdded = addMutagenesiAt(aMutagenesi, index);
    }
    return wasAdded;
  }

  public void delete()
  {
    if (customer != null)
    {
      Customer placeholderCustomer = customer;
      this.customer = null;
      placeholderCustomer.removeCustomerBackbone(this);
    }
    SyntheticInsert existingSyntheticInsert = syntheticInsert;
    syntheticInsert = null;
    if (existingSyntheticInsert != null)
    {
      existingSyntheticInsert.delete();
    }
    for(int i=syntheticInserts.size(); i > 0; i--)
    {
      SyntheticInsert aSyntheticInsert = syntheticInserts.get(i - 1);
      aSyntheticInsert.delete();
    }
    for(int i=multiFragments.size(); i > 0; i--)
    {
      MultiFragment aMultiFragment = multiFragments.get(i - 1);
      aMultiFragment.delete();
    }
    MultiFragment placeholderMultiFragment = multiFragment;
    this.multiFragment = null;
    if(placeholderMultiFragment != null)
    {
      placeholderMultiFragment.removeFragment(this);
    }
    OwnBackbone placeholderOwnBackbone = ownBackbone;
    this.ownBackbone = null;
    if(placeholderOwnBackbone != null)
    {
      placeholderOwnBackbone.removeFragment(this);
    }
    for(int i=mutagenesis.size(); i > 0; i--)
    {
      Mutagenesis aMutagenesi = mutagenesis.get(i - 1);
      aMutagenesi.delete();
    }
  }


  public String toString()
  {
    return super.toString() + "["+
            "fragmentID" + ":" + getFragmentID()+ "," +
            "sequence" + ":" + getSequence()+ "," +
            "toBeOrdered" + ":" + getToBeOrdered()+ "," +
            "valid" + ":" + getValid()+ "," +
            "isBackbone" + ":" + getIsBackbone()+ "]" + System.getProperties().getProperty("line.separator") +
            "  " + "dnaSource" + "=" + (getDnaSource() != null ? !getDnaSource().equals(this)  ? getDnaSource().toString().replaceAll("  ","    ") : "this" : "null") + System.getProperties().getProperty("line.separator") +
            "  " + "customer = "+(getCustomer()!=null?Integer.toHexString(System.identityHashCode(getCustomer())):"null") + System.getProperties().getProperty("line.separator") +
            "  " + "syntheticInsert = "+(getSyntheticInsert()!=null?Integer.toHexString(System.identityHashCode(getSyntheticInsert())):"null") + System.getProperties().getProperty("line.separator") +
            "  " + "multiFragment = "+(getMultiFragment()!=null?Integer.toHexString(System.identityHashCode(getMultiFragment())):"null") + System.getProperties().getProperty("line.separator") +
            "  " + "ownBackbone = "+(getOwnBackbone()!=null?Integer.toHexString(System.identityHashCode(getOwnBackbone())):"null");
  }
}