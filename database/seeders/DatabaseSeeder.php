<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderStatus;
use App\Models\Project;
use App\Models\Region;
use App\Models\Shipping;
use App\Models\Theme;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Region::create(['id' => 1, 'fg_name' => 'Adrar', 'ar_name' => 'أدرار']);
        Region::create(['id' => 2, 'fg_name' => 'Chlef', 'ar_name' => 'الشلف']);
        Region::create(['id' => 3, 'fg_name' => 'Laghouat', 'ar_name' => 'الأغواط']);
        Region::create(['id' => 4, 'fg_name' => 'Oum El Bouaghi', 'ar_name' => 'أم البواقي']);
        Region::create(['id' => 5, 'fg_name' => 'Batna', 'ar_name' => 'باتنة']);
        Region::create(['id' => 6, 'fg_name' => 'Béjaïa', 'ar_name' => 'بجاية']);
        Region::create(['id' => 7, 'fg_name' => 'Biskra', 'ar_name' => 'بسكرة']);
        Region::create(['id' => 8, 'fg_name' => 'Béchar', 'ar_name' => 'بشار']);
        Region::create(['id' => 9, 'fg_name' => 'Blida', 'ar_name' => 'البليدة']);
        Region::create(['id' => 10, 'fg_name' => 'Bouira', 'ar_name' => 'البويرة']);
        Region::create(['id' => 11, 'fg_name' => 'Tamanrasset', 'ar_name' => 'تمنراست']);
        Region::create(['id' => 12, 'fg_name' => 'Tébessa', 'ar_name' => 'تبسة']);
        Region::create(['id' => 13, 'fg_name' => 'Tlemcen', 'ar_name' => 'تلمسان']);
        Region::create(['id' => 14, 'fg_name' => 'Tiaret', 'ar_name' => 'تيارت']);
        Region::create(['id' => 15, 'fg_name' => 'Tizi Ouzou', 'ar_name' => 'تيزي وزو']);
        Region::create(['id' => 16, 'fg_name' => 'Alger', 'ar_name' => 'الجزائر']);
        Region::create(['id' => 17, 'fg_name' => 'Djelfa', 'ar_name' => 'الجلفة']);
        Region::create(['id' => 18, 'fg_name' => 'Jijel', 'ar_name' => 'جيجل']);
        Region::create(['id' => 19, 'fg_name' => 'Sétif', 'ar_name' => 'سطيف']);
        Region::create(['id' => 20, 'fg_name' => 'Saïda', 'ar_name' => 'سعيدة']);
        Region::create(['id' => 21, 'fg_name' => 'Skikda', 'ar_name' => 'سكيكدة']);
        Region::create(['id' => 22, 'fg_name' => 'Sidi Bel Abbès', 'ar_name' => 'سيدي بلعباس']);
        Region::create(['id' => 23, 'fg_name' => 'Annaba', 'ar_name' => 'عنابة']);
        Region::create(['id' => 24, 'fg_name' => 'Guelma', 'ar_name' => 'قالمة']);
        Region::create(['id' => 25, 'fg_name' => 'Constantine', 'ar_name' => 'قسنطينة']);
        Region::create(['id' => 26, 'fg_name' => 'Médéa', 'ar_name' => 'المدية']);
        Region::create(['id' => 27, 'fg_name' => 'Mostaganem', 'ar_name' => 'مستغانم']);
        Region::create(['id' => 28, 'fg_name' => 'M\'Sila', 'ar_name' => 'المسيلة']);
        Region::create(['id' => 29, 'fg_name' => 'Mascara', 'ar_name' => 'معسكر']);
        Region::create(['id' => 30, 'fg_name' => 'Ouargla', 'ar_name' => 'ورقلة']);
        Region::create(['id' => 31, 'fg_name' => 'Oran', 'ar_name' => 'وهران']);
        Region::create(['id' => 32, 'fg_name' => 'El Bayadh', 'ar_name' => 'البيض']);
        Region::create(['id' => 33, 'fg_name' => 'Illizi', 'ar_name' => 'إليزي']);
        Region::create(['id' => 34, 'fg_name' => 'Bordj Bou Arréridj', 'ar_name' => 'برج بوعريريج']);
        Region::create(['id' => 35, 'fg_name' => 'Boumerdès', 'ar_name' => 'بومرداس']);
        Region::create(['id' => 36, 'fg_name' => 'El Tarf', 'ar_name' => 'الطارف']);
        Region::create(['id' => 37, 'fg_name' => 'Tindouf', 'ar_name' => 'تندوف']);
        Region::create(['id' => 38, 'fg_name' => 'Tissemsilt', 'ar_name' => 'تيسمسيلت']);
        Region::create(['id' => 39, 'fg_name' => 'El Oued', 'ar_name' => 'الوادي']);
        Region::create(['id' => 40, 'fg_name' => 'Khenchela', 'ar_name' => 'خنشلة']);
        Region::create(['id' => 41, 'fg_name' => 'Souk Ahras', 'ar_name' => 'سوق أهراس']);
        Region::create(['id' => 42, 'fg_name' => 'Tipaza', 'ar_name' => 'تيبازة']);
        Region::create(['id' => 43, 'fg_name' => 'Mila', 'ar_name' => 'ميلة']);
        Region::create(['id' => 44, 'fg_name' => 'Aïn Defla', 'ar_name' => 'عين الدفلى']);
        Region::create(['id' => 45, 'fg_name' => 'Naâma', 'ar_name' => 'النعامة']);
        Region::create(['id' => 46, 'fg_name' => 'Aïn Témouchent', 'ar_name' => 'عين تموشنت']);
        Region::create(['id' => 47, 'fg_name' => 'Ghardaïa', 'ar_name' => 'غرداية']);
        Region::create(['id' => 48, 'fg_name' => 'Relizane', 'ar_name' => 'غليزان']);

        Region::create(['id' => 49, 'fg_name' => 'Timimoun', 'ar_name' => 'تيميمون']);
        Region::create(['id' => 50, 'fg_name' => 'Bordj Badji Mokhtar', 'ar_name' => 'برج باجي مختار']);
        Region::create(['id' => 51, 'fg_name' => 'Ouled Djellal', 'ar_name' => 'أولاد جلال']);
        Region::create(['id' => 52, 'fg_name' => 'Béni Abbès', 'ar_name' => 'بني عباس']);
        Region::create(['id' => 53, 'fg_name' => 'In Salah', 'ar_name' => 'إن صالح']);
        Region::create(['id' => 54, 'fg_name' => 'In Guezzam', 'ar_name' => 'إن قزام']);
        Region::create(['id' => 55, 'fg_name' => 'Touggourt', 'ar_name' => 'تقرت']);
        Region::create(['id' => 56, 'fg_name' => 'Djanet', 'ar_name' => 'جانت']);
        Region::create(['id' => 57, 'fg_name' => 'El M\'Ghair', 'ar_name' => 'المغير']);
        Region::create(['id' => 58, 'fg_name' => 'El Meniaa', 'ar_name' => 'المنيعة']);

        Region::create(['id' => 59, 'fg_name' => 'Aflou', 'ar_name' => 'أفلو']);
        Region::create(['id' => 60, 'fg_name' => 'El Abiodh Sidi Cheikh', 'ar_name' => 'الأبيض سيدي الشيخ']);
        Region::create(['id' => 61, 'fg_name' => 'El Aricha', 'ar_name' => 'العريشة']);
        Region::create(['id' => 62, 'fg_name' => 'El Kantara', 'ar_name' => 'القنطرة']);
        Region::create(['id' => 63, 'fg_name' => 'Barika', 'ar_name' => 'باريكة']);
        Region::create(['id' => 64, 'fg_name' => 'Bou Saâda', 'ar_name' => 'بو سعادة']);
        Region::create(['id' => 65, 'fg_name' => 'Bir El Ater', 'ar_name' => 'بئر العاتر']);
        Region::create(['id' => 66, 'fg_name' => 'Ksar El Boukhari', 'ar_name' => 'قصر البخاري']);
        Region::create(['id' => 67, 'fg_name' => 'Ksar Chellala', 'ar_name' => 'قصر شلالة']);
        Region::create(['id' => 68, 'fg_name' => 'Aïn Oussara', 'ar_name' => 'عين وسارة']);
        Region::create(['id' => 69, 'fg_name' => 'Messaad', 'ar_name' => 'المسعد']);

        OrderStatus::factory()->create(['en_message' => 'Pending', 'ar_message' => 'قيد الانتظار', 'fr_message' => 'En attente']);
        OrderStatus::factory()->create(['en_message' => 'Processing', 'ar_message' => 'قيد المعالجة', 'fr_message' => 'En cours de traitement']);
        OrderStatus::factory()->create(['en_message' => 'Shipped', 'ar_message' => 'قيد الإرسال', 'fr_message' => 'En cours de livraison']);
        OrderStatus::factory()->create(['en_message' => 'Delivered', 'ar_message' => 'تم التسليم', 'fr_message' => 'Livrée']);
        OrderStatus::factory()->create(['en_message' => 'Canceled', 'ar_message' => 'تم إلغاؤه', 'fr_message' => 'Annulée']);
        OrderStatus::factory()->create(['en_message' => 'Returned', 'ar_message' => 'تم إرجاعه', 'fr_message' => 'Retourée']);

        User::factory()->create([
            'id' => 1,
            'firstName' => 'Sohaib',
            'lastName' => 'KHIAF',
            'email' => 'sohaibkhiaf@gmail.com',
            'password' => Hash::make('password'),
            'role' => 1,
            'phone' => '0659595372',
            'address' => 'El Alia, Biskra',
            'region_id' => 7,
        ]);

        $project = Project::factory()->create([
            'project_class' => 'landing-page',
            'name' => 'Dell XPS 15',
            'description' => 'A premium 15-inch laptop featuring a sleek aluminum chassis
4K OLED display, Intel Core i9 processor
NVIDIA RTX 4060 graphics
32GB RAM
and fast SSD storage. 
It’s designed for creative professionals who need top-tier performance for video editing, 3D rendering, and multitasking, while maintaining portability and long battery life.',
            'category' => 'Laptops',
            'price' => 162000,
            'stock' => 12,
            'slug' => 'laptop-dell-xps-15',
            'meta_pixel_id' => '651743544679945',
            'user_id' => 1,
        ]);

        Theme::factory(1)->create([
            'project_id' => $project->id,
        ]);

        for ($i = 1; $i <= 69; $i++) {
            Shipping::factory()->create([
                'region_id' => $i,
                'project_id' => $project->id,
                'enabled' => true,
            ]);
        }

        Order::factory(20)->create();

    }
}
