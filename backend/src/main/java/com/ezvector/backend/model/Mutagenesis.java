package com.ezvector.backend.model;/*PLEASE DO NOT EDIT THIS CODE*/
/*This code was generated using the UMPLE 1.35.0.7523.c616a4dce modeling language!*/


import java.util.*;
import java.sql.Date;

// line 95 "model.ump"
// line 175 "model.ump"
public class Mutagenesis extends Plasmid
{

  //------------------------
  // STATIC VARIABLES
  //------------------------


  /**
   * change base price
   */
  public static final int BASE_PRICE = 16;

  //------------------------
  // MEMBER VARIABLES
  //------------------------

  //Mutagenesis Associations
  private List<Mutation> mutations;
  private Fragment backbone;

  //------------------------
  // CONSTRUCTOR
  //------------------------

  public Mutagenesis(int aPlasmidID, String aPlasmidName, String aPlasmidSequence, int aTotalPlasmidPrice, Date aDateCreated, boolean aIsSaved, Fragment aBackbone)
  {
    super(aPlasmidID, aPlasmidName, aPlasmidSequence, aTotalPlasmidPrice, aDateCreated, aIsSaved);
    mutations = new ArrayList<Mutation>();
    boolean didAddBackbone = setBackbone(aBackbone);
    if (!didAddBackbone)
    {
      throw new RuntimeException("Unable to create mutagenesi due to backbone. See https://manual.umple.org?RE002ViolationofAssociationMultiplicity.html");
    }
  }

  //------------------------
  // INTERFACE
  //------------------------
  /* Code from template association_GetMany */
  public Mutation getMutation(int index)
  {
    Mutation aMutation = mutations.get(index);
    return aMutation;
  }

  public List<Mutation> getMutations()
  {
    List<Mutation> newMutations = Collections.unmodifiableList(mutations);
    return newMutations;
  }

  public int numberOfMutations()
  {
    int number = mutations.size();
    return number;
  }

  public boolean hasMutations()
  {
    boolean has = mutations.size() > 0;
    return has;
  }

  public int indexOfMutation(Mutation aMutation)
  {
    int index = mutations.indexOf(aMutation);
    return index;
  }
  /* Code from template association_GetOne */
  public Fragment getBackbone()
  {
    return backbone;
  }
  /* Code from template association_IsNumberOfValidMethod */
  public boolean isNumberOfMutationsValid()
  {
    boolean isValid = numberOfMutations() >= minimumNumberOfMutations() && numberOfMutations() <= maximumNumberOfMutations();
    return isValid;
  }
  /* Code from template association_MinimumNumberOfMethod */
  public static int minimumNumberOfMutations()
  {
    return 1;
  }
  /* Code from template association_MaximumNumberOfMethod */
  public static int maximumNumberOfMutations()
  {
    return 5;
  }
  /* Code from template association_AddMNToOnlyOne */
  public Mutation addMutation(String aSequence)
  {
    if (numberOfMutations() >= maximumNumberOfMutations())
    {
      return null;
    }
    else
    {
      return new Mutation(aSequence, this);
    }
  }

  public boolean addMutation(Mutation aMutation)
  {
    boolean wasAdded = false;
    if (mutations.contains(aMutation)) { return false; }
    if (numberOfMutations() >= maximumNumberOfMutations())
    {
      return wasAdded;
    }

    Mutagenesis existingMutagenesis = aMutation.getMutagenesis();
    boolean isNewMutagenesis = existingMutagenesis != null && !this.equals(existingMutagenesis);

    if (isNewMutagenesis && existingMutagenesis.numberOfMutations() <= minimumNumberOfMutations())
    {
      return wasAdded;
    }

    if (isNewMutagenesis)
    {
      aMutation.setMutagenesis(this);
    }
    else
    {
      mutations.add(aMutation);
    }
    wasAdded = true;
    return wasAdded;
  }

  public boolean removeMutation(Mutation aMutation)
  {
    boolean wasRemoved = false;
    //Unable to remove aMutation, as it must always have a mutagenesis
    if (this.equals(aMutation.getMutagenesis()))
    {
      return wasRemoved;
    }

    //mutagenesis already at minimum (1)
    if (numberOfMutations() <= minimumNumberOfMutations())
    {
      return wasRemoved;
    }
    mutations.remove(aMutation);
    wasRemoved = true;
    return wasRemoved;
  }
  /* Code from template association_AddIndexControlFunctions */
  public boolean addMutationAt(Mutation aMutation, int index)
  {  
    boolean wasAdded = false;
    if(addMutation(aMutation))
    {
      if(index < 0 ) { index = 0; }
      if(index > numberOfMutations()) { index = numberOfMutations() - 1; }
      mutations.remove(aMutation);
      mutations.add(index, aMutation);
      wasAdded = true;
    }
    return wasAdded;
  }

  public boolean addOrMoveMutationAt(Mutation aMutation, int index)
  {
    boolean wasAdded = false;
    if(mutations.contains(aMutation))
    {
      if(index < 0 ) { index = 0; }
      if(index > numberOfMutations()) { index = numberOfMutations() - 1; }
      mutations.remove(aMutation);
      mutations.add(index, aMutation);
      wasAdded = true;
    } 
    else 
    {
      wasAdded = addMutationAt(aMutation, index);
    }
    return wasAdded;
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
      existingBackbone.removeMutagenesi(this);
    }
    backbone.addMutagenesi(this);
    wasSet = true;
    return wasSet;
  }

  public void delete()
  {
    for(int i=mutations.size(); i > 0; i--)
    {
      Mutation aMutation = mutations.get(i - 1);
      aMutation.delete();
    }
    Fragment placeholderBackbone = backbone;
    this.backbone = null;
    if(placeholderBackbone != null)
    {
      placeholderBackbone.removeMutagenesi(this);
    }
    super.delete();
  }


  public String toString()
  {
    return super.toString() + "["+ "]" + System.getProperties().getProperty("line.separator") +
            "  " + "backbone = "+(getBackbone()!=null?Integer.toHexString(System.identityHashCode(getBackbone())):"null");
  }
}