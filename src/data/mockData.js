export const categories = [
  { id: 'PanCancer', label: 'PanCancer Studies', count: 12 },
  { id: 'Pediatric', label: 'Pediatric Cancer Studies', count: 17 },
  { id: 'Immunogenomic', label: 'Immunogenomic Studies', count: 17 },
  { id: 'CellLines', label: 'Cell lines', count: 5 },
  { id: 'Healthy', label: 'PreCancerous/Healthy Studies', count: 5 },
  { id: 'Adrenal', label: 'Adrenal Gland', count: 3 },
  { id: 'Biliary', label: 'Biliary Tract', count: 16 },
  { id: 'Bladder', label: 'Bladder/Urinary Tract', count: 27 },
  { id: 'Bone', label: 'Bone', count: 1 },
  { id: 'Breast', label: 'Breast', count: 36 },
];

export const studies = {
  PanCancer: [
    { id: 1, name: "MSK-IMPACT 50K Clinical Sequencing Cohort (MSK, Cancer Cell 2024)", samples: 54331, dataTypes: ['Mutations', 'CNA', 'SV'] },
    { id: 2, name: "MSK-CHORD (MSK, Nature 2024)", samples: 25040, dataTypes: ['Mutations', 'CNA'] },
    { id: 3, name: "MSK-IMPACT Clinical Sequencing Cohort (MSK, Nat Med 2017)", samples: 10945, dataTypes: ['Mutations', 'CNA', 'Clinical'] },
    { id: 4, name: "Metastatic Solid Cancers (UMich, Nature 2017)", samples: 500, dataTypes: ['Mutations'] },
    { id: 5, name: "MSS Mixed Solid Tumors (Broad/Dana-Farber, Nat Genet 2018)", samples: 249, dataTypes: ['CNA', 'RNA'] }
  ],
  Pediatric: [
    { id: 10, name: "Pediatric Preclinical Testing Consortium (CHOP, Cell Rep 2019)", samples: 261, dataTypes: ['Mutations', 'CNA'] },
    { id: 11, name: "Pediatric Acute Lymphoid Leukemia - Phase II (TARGET, 2018)", samples: 1978, dataTypes: ['Mutations', 'RNA', 'Clinical'] },
    { id: 12, name: "Pediatric Rhabdoid Tumor (TARGET, 2018)", samples: 72, dataTypes: ['Mutations', 'SV'] }
  ]
};
