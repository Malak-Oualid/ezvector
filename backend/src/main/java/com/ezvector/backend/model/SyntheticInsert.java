package com.ezvector.backend.model;/*PLEASE DO NOT EDIT THIS CODE*/
/*This code was generated using the UMPLE 1.35.0.7523.c616a4dce modeling language!*/


import java.sql.Date;
import com.ezvector.backend.model.Fragment.DNAsource;

// line 72 "model.ump"
// line 160 "model.ump"
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
  private Fragment syntheticInsert;
  private Fragment backbone;

  //------------------------
  // CONSTRUCTOR
  //------------------------

  public SyntheticInsert(String aPlasmidID, String aPlasmidName, String aPlasmidSequence, int aTotalPlasmidPrice, Date aDateCreated, boolean aIsSaved, Fragment aSyntheticInsert, Fragment aBackbone)
  {
    super(aPlasmidID, aPlasmidName, aPlasmidSequence, aTotalPlasmidPrice, aDateCreated, aIsSaved);
    if (aSyntheticInsert == null || aSyntheticInsert.getSyntheticInsert() != null)
    {
      throw new RuntimeException("Unable to create SyntheticInsert due to aSyntheticInsert. See https://manual.umple.org?RE002ViolationofAssociationMultiplicity.html");
    }
    syntheticInsert = aSyntheticInsert;
    boolean didAddBackbone = setBackbone(aBackbone);
    if (!didAddBackbone)
    {
      throw new RuntimeException("Unable to create syntheticInsert due to backbone. See https://manual.umple.org?RE002ViolationofAssociationMultiplicity.html");
    }
  }

  public SyntheticInsert(String aPlasmidID, String aPlasmidName, String aPlasmidSequence, int aTotalPlasmidPrice, Date aDateCreated, boolean aIsSaved, String aFragmentIDForSyntheticInsert, DNAsource aDnaSourceForSyntheticInsert, String aSequenceForSyntheticInsert, boolean aToBeOrderedForSyntheticInsert, boolean aValidForSyntheticInsert, boolean aIsBackboneForSyntheticInsert, MultiFragment aMultiFragmentForSyntheticInsert, OwnBackbone aOwnBackboneForSyntheticInsert, Fragment aBackbone)
  {
    super(aPlasmidID, aPlasmidName, aPlasmidSequence, aTotalPlasmidPrice, aDateCreated, aIsSaved);
    syntheticInsert = new Fragment(aFragmentIDForSyntheticInsert, aDnaSourceForSyntheticInsert, aSequenceForSyntheticInsert, aToBeOrderedForSyntheticInsert, aValidForSyntheticInsert, aIsBackboneForSyntheticInsert, this, aMultiFragmentForSyntheticInsert, aOwnBackboneForSyntheticInsert);
    boolean didAddBackbone = setBackbone(aBackbone);
    if (!didAddBackbone)
    {
      throw new RuntimeException("Unable to create syntheticInsert due to backbone. See https://manual.umple.org?RE002ViolationofAssociationMultiplicity.html");
    }
  }

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
      existingBackbone.removeSyntheticInsert(this);
    }
    backbone.addSyntheticInsert(this);
    wasSet = true;
    return wasSet;
  }

  public void delete()
  {
    Fragment existingSyntheticInsert = syntheticInsert;
    syntheticInsert = null;
    if (existingSyntheticInsert != null)
    {
      existingSyntheticInsert.delete();
    }
    Fragment placeholderBackbone = backbone;
    this.backbone = null;
    if(placeholderBackbone != null)
    {
      placeholderBackbone.removeSyntheticInsert(this);
    }
    super.delete();
  }


  public String toString()
  {
    return super.toString() + "["+ "]" + System.getProperties().getProperty("line.separator") +
            "  " + "syntheticInsert = "+(getSyntheticInsert()!=null?Integer.toHexString(System.identityHashCode(getSyntheticInsert())):"null") + System.getProperties().getProperty("line.separator") +
            "  " + "backbone = "+(getBackbone()!=null?Integer.toHexString(System.identityHashCode(getBackbone())):"null");
  }
}