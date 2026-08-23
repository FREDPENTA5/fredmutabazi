# Claims Turnaround Dashboard

**Objective:** Design an interactive, live dashboard for the operations team to track farmer enrollment, compare claims filed vs. claims paid, and monitor average processing times by region in real-time.

## 1. The Challenge
Historically, the operations team relied on manually extracted CSVs from the core platform to calculate claims turnaround times. This manual process took up to 15 hours per week of analyst time and often resulted in a 3-day lag in spotting regional processing bottlenecks.

## 2. Data Pipeline & Modeling
- **Data Source:** Automated a daily SQL view extracting data from the transactional database (PostgreSQL).
- **Transformation:** Cleaned missing dates and joined `farmer_enrollment`, `claims_filed`, and `payouts` tables.
- **Data Model:** Created a Star Schema in Power BI with a central Fact Table (`Fact_Claims`) and dimension tables for `Dim_Geography`, `Dim_Time`, and `Dim_CropType`.

### Core SQL Extraction Query
```sql
SELECT 
    c.claim_id,
    c.farmer_id,
    g.region_name,
    c.date_filed,
    p.date_paid,
    EXTRACT(EPOCH FROM (p.date_paid - c.date_filed))/86400 AS turnaround_days,
    c.claim_amount,
    p.payout_amount
FROM claims c
LEFT JOIN payouts p ON c.claim_id = p.claim_id
JOIN geography g ON c.district_id = g.district_id
WHERE c.date_filed >= '2023-01-01';
```

## 3. Power BI DAX Measures
To power the KPIs, several DAX measures were engineered:

```dax
Avg_Turnaround_Days = AVERAGE(Fact_Claims[turnaround_days])

Claims_Paid_Ratio = 
DIVIDE(
    CALCULATE(COUNTROWS(Fact_Claims), NOT(ISBLANK(Fact_Claims[date_paid]))),
    COUNTROWS(Fact_Claims)
)
```

## 4. Final Dashboard Deliverable
The dashboard was deployed to the Power BI Service, accessible securely by regional managers.

![Claims Volume and Resolution Time](claims_dashboard.png)

## 5. Business Impact
*   **Time Saved:** Reduced manual reporting time by **15 hours/week**, fully automating the data refresh.
*   **Operational Efficiency:** The regional breakdown chart immediately highlighted a 4-day lag in the Northern district, allowing operations to reallocate assessors and clear the backlog, improving overall SLA compliance by 20%.
