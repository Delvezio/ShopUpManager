<!-- src/routes/dashboard/+page.svelte -->

<script lang="ts">
  import { products } from '$lib/stores/products';
  import StatCard from '$lib/components/ui/card/StatCard.svelte';
  import StatCardGrid from '$lib/components/dashboard/StatCardGrid.svelte';
  import ProductTable from '$lib/components/dashboard/product/ProductTable.svelte';
  import CSVUploadForm from '$lib/components/dashboard/CSVUploadForm.svelte';
  import { Users, Mail, MousePointer } from 'lucide-svelte';

  // Ora puoi usare $products in markup
</script>

<StatCardGrid>
  <StatCard
    title="Totale Prodotti"
    value={$products.length.toString()}
    icon={Users}
    trend="up"
    trendValue="122"
    href="/prodotti"
  />
  <StatCard
    title="Utile minimo"
    value="20%"
    icon={Mail}
    trend="down"
    trendValue="0.5%"
    href="/prezzi"
  />
  <StatCard
    title="Sconti Applicati"
    value="154"
    icon={MousePointer}
    trend="up"
    trendValue="10%"
    href="/sconti"
  />
</StatCardGrid>

<section class="space-y-6 px-6">
  <div>
    <h1 class="text-2xl font-semibold mb-2">I tuoi prodotti</h1>
    <CSVUploadForm />
  </div>
  <div class="w-full overflow-x-auto">
    <ProductTable />
  </div>
</section>
